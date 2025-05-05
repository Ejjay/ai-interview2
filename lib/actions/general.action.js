"use server";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterviewsByUserId = exports.getLatestInterviews = exports.getFeedbackByInterviewId = exports.getInterviewById = exports.createFeedback = void 0;
var ai_1 = require("ai");
var google_1 = require("@ai-sdk/google");
var admin_1 = require("@/firebase/admin");
var constants_1 = require("@/constants");
function createFeedback(params) {
    return __awaiter(this, void 0, void 0, function () {
        var interviewId, userId, transcript, feedbackId, formattedTranscript, object, feedback, feedbackRef, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interviewId = params.interviewId, userId = params.userId, transcript = params.transcript, feedbackId = params.feedbackId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    formattedTranscript = transcript
                        .map(function (sentence) {
                        return "- ".concat(sentence.role, ": ").concat(sentence.content, "\n");
                    })
                        .join("");
                    return [4 /*yield*/, (0, ai_1.generateObject)({
                            model: (0, google_1.google)("gemini-2.0-flash-001", {
                                structuredOutputs: false,
                            }),
                            schema: constants_1.feedbackSchema,
                            prompt: "\n        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.\n        Transcript:\n        ".concat(formattedTranscript, "\n\n        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:\n        - **Communication Skills**: Clarity, articulation, structured responses.\n        - **Technical Knowledge**: Understanding of key concepts for the role.\n        - **Problem-Solving**: Ability to analyze problems and propose solutions.\n        - **Cultural & Role Fit**: Alignment with company values and job role.\n        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.\n        "),
                            system: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
                        })];
                case 2:
                    object = (_a.sent()).object;
                    feedback = {
                        interviewId: interviewId,
                        userId: userId,
                        totalScore: object.totalScore,
                        categoryScores: object.categoryScores,
                        strengths: object.strengths,
                        areasForImprovement: object.areasForImprovement,
                        finalAssessment: object.finalAssessment,
                        createdAt: new Date().toISOString(),
                    };
                    feedbackRef = void 0;
                    if (feedbackId) {
                        feedbackRef = admin_1.db.collection("feedback").doc(feedbackId);
                    }
                    else {
                        feedbackRef = admin_1.db.collection("feedback").doc();
                    }
                    return [4 /*yield*/, feedbackRef.set(feedback)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, { success: true, feedbackId: feedbackRef.id }];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error saving feedback:", error_1);
                    return [2 /*return*/, { success: false }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createFeedback = createFeedback;
function getInterviewById(id) {
    return __awaiter(this, void 0, Promise, function () {
        var interview;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, admin_1.db.collection("interviews").doc(id).get()];
                case 1:
                    interview = _a.sent();
                    return [2 /*return*/, interview.data()];
            }
        });
    });
}
exports.getInterviewById = getInterviewById;
function getFeedbackByInterviewId(params) {
    return __awaiter(this, void 0, Promise, function () {
        var interviewId, userId, querySnapshot, feedbackDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interviewId = params.interviewId, userId = params.userId;
                    return [4 /*yield*/, admin_1.db
                            .collection("feedback")
                            .where("interviewId", "==", interviewId)
                            .where("userId", "==", userId)
                            .limit(1)
                            .get()];
                case 1:
                    querySnapshot = _a.sent();
                    if (querySnapshot.empty)
                        return [2 /*return*/, null];
                    feedbackDoc = querySnapshot.docs[0];
                    return [2 /*return*/, __assign({ id: feedbackDoc.id }, feedbackDoc.data())];
            }
        });
    });
}
exports.getFeedbackByInterviewId = getFeedbackByInterviewId;
function getLatestInterviews(params) {
    return __awaiter(this, void 0, Promise, function () {
        var userId, _a, limit, interviews;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = params.userId, _a = params.limit, limit = _a === void 0 ? 20 : _a;
                    return [4 /*yield*/, admin_1.db
                            .collection("interviews")
                            .orderBy("createdAt", "desc")
                            .where("finalized", "==", true)
                            .where("userId", "!=", userId)
                            .limit(limit)
                            .get()];
                case 1:
                    interviews = _b.sent();
                    return [2 /*return*/, interviews.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); })];
            }
        });
    });
}
exports.getLatestInterviews = getLatestInterviews;
function getInterviewsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var interviewsRef, q, querySnapshot, interviews, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userId)
                        return [2 /*return*/, null];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    interviewsRef = collection(admin_1.db, "interviews");
                    q = query(interviewsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
                    return [4 /*yield*/, getDocs(q)];
                case 2:
                    querySnapshot = _a.sent();
                    interviews = querySnapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                    return [2 /*return*/, interviews];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching interviews:", error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getInterviewsByUserId = getInterviewsByUserId;
