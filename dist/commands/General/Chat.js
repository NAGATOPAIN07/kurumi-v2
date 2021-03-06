"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const axios_1 = __importDefault(require("axios"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'chat',
            description: 'Chat with the Bot in group',
            aliases: ['bot'],
            category: 'fun',
            usage: `${client.config.prefix}bot (text)`,
            baseXp: 30
        });
        this.run = (M) => __awaiter(this, void 0, void 0, function* () {
            if (this.client.config.chatBotUrl) {
                const myUrl = new URL(this.client.config.chatBotUrl);
                const params = myUrl.searchParams;
                yield axios_1.default
                    .get(`${encodeURI(`http://api.brainshop.ai/get?bid=${params.get('bid')}&key=${params.get('key')}&uid=${M.from}&msg=${M.args.slice(1)}`)}`)
                    .then((res) => {
                    if (res.status !== 200)
                        return void M.reply(`🔍 Error: ${res.status}`);
                    return void M.reply(res.data.cnt);
                })
                    .catch(() => {
                    M.reply(`Intriguing...`);
                });
            }
            else {
                M.reply(`Chat Bot Url not set.`);
            }
        });
    }
}
exports.default = Command;
