import {
  Switch
} from "./chunk-HXUFFIHY.js";
import {
  TAnswerStatus,
  chatContext
} from "./chunk-EWDHTKD6.js";

// node_modules/@orama/wc-components/dist/esm/ChatService-fef0efc3.js
var OramaClientNotInitializedError = class extends Error {
  constructor() {
    super("Orama Client is not initialized");
  }
};
var ChatService = class {
  constructor(oramaClient) {
    this.sendQuestion = (term, systemPrompts, callbacks) => {
      if (!this.oramaClient) {
        throw new OramaClientNotInitializedError();
      }
      const askParams = { term, related: { howMany: 3, format: "question" } };
      if (!this.answerSession) {
        this.answerSession = this.oramaClient.createAnswerSession({
          events: {
            onStateChange: (state) => {
              const normalizedState = state.filter((stateItem) => !!stateItem.query);
              chatContext.interactions = normalizedState.map((interaction, index) => {
                var _a, _b, _c;
                const isLatest = state.length - 1 === index;
                let answerStatus = TAnswerStatus.loading;
                let sources = [];
                if (interaction.aborted) {
                  answerStatus = TAnswerStatus.aborted;
                } else if (interaction.loading && interaction.sources) {
                  answerStatus = TAnswerStatus.rendering;
                } else if (interaction.loading && interaction.response) {
                  answerStatus = TAnswerStatus.streaming;
                } else if (!interaction.loading && interaction.response) {
                  answerStatus = TAnswerStatus.done;
                }
                if (interaction.sources) {
                  sources = Array.isArray(interaction.sources) ? (_a = interaction.sources) === null || _a === void 0 ? void 0 : _a.map((source) => source.document) : (_b = interaction.sources.hits) === null || _b === void 0 ? void 0 : _b.map((source) => source.document);
                }
                if (isLatest && answerStatus === TAnswerStatus.done) {
                  (_c = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onAnswerGeneratedCallback) === null || _c === void 0 ? void 0 : _c.call(callbacks, {
                    askParams,
                    query: interaction.query,
                    sources: interaction.sources,
                    answer: interaction.response,
                    segment: interaction.segment,
                    trigger: interaction.trigger
                  });
                }
                return {
                  query: interaction.query,
                  interactionId: interaction.interactionId,
                  response: interaction.response,
                  relatedQueries: interaction.relatedQueries,
                  status: answerStatus,
                  latest: isLatest,
                  sources
                };
              });
            }
          }
        });
        if (this.oramaClient.clientType === "cloud" && systemPrompts) {
          this.answerSession.setSystemPromptConfiguration({ systemPrompts });
        }
      }
      return this.answerSession.ask(askParams).catch((error) => {
        chatContext.interactions = chatContext.interactions.map((interaction, index) => {
          if (index === chatContext.interactions.length - 1) {
            return Object.assign(Object.assign({}, interaction), { status: TAnswerStatus.error });
          }
          return interaction;
        });
        console.error(error);
      });
    };
    this.abortAnswer = () => {
      if (!this.answerSession) {
        throw new OramaClientNotInitializedError();
      }
      this.answerSession.abortAnswer();
    };
    this.regenerateLatest = async () => {
      if (!this.answerSession) {
        throw new OramaClientNotInitializedError();
      }
      this.answerSession.regenerateLast({ stream: false });
    };
    this.resetChat = async () => {
      if (!this.answerSession) {
        throw new OramaClientNotInitializedError();
      }
      if (chatContext.interactions.length < 1) {
        return;
      }
      if (["loading", "rendering", "streaming"].includes(chatContext.interactions[chatContext.interactions.length - 1].status)) {
        this.answerSession.abortAnswer();
      }
      this.answerSession.clearSession();
    };
    this.oramaClient = new Switch(oramaClient);
  }
};

export {
  OramaClientNotInitializedError,
  ChatService
};
//# sourceMappingURL=chunk-LGL2XIKM.js.map
