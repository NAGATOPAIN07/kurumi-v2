"use strict";
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
const baileys_1 = require("@adiwajshing/baileys");
const BaseCommand_1 = __importDefault(require("../../lib/BaseCommand"));
const yt_search_1 = __importDefault(require("yt-search"));
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: 'ytsearch',
            description: 'Searches YT',
            category: 'media',
            aliases: ['yts'],
            usage: `${client.config.prefix}yts [term]`,
            baseXp: 20
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            if (!joined)
                return void M.reply('š Provide a search term');
            const term = joined.trim();
            const { videos } = yield (0, yt_search_1.default)(term);
            if (!videos || videos.length <= 0)
                return void M.reply(`ā No Matching videos found for : *${term}*`);
            const length = videos.length < 10 ? videos.length : 10;
            let text = `š *Results for ${term}*\n`;
            for (let i = 0; i < length; i++) {
                text += `*#${i + 1}*\nš *Title:* ${videos[i].title}\nš *Channel:* ${videos[i].author.name}\n š *Duration:* ${videos[i].duration}\nš *URL:* ${videos[i].url}\n\n`;
            }
            M.reply('š Searching...');
            this.client
                .sendMessage(M.from, text, baileys_1.MessageType.extendedText, {
                quoted: M.WAMessage,
                contextInfo: {
                    externalAdReply: {
                        title: `Search Term: ${term}`,
                        body: `š Chitoge š`,
                        mediaType: 2,
                        thumbnailUrl: videos[0].thumbnail,
                        mediaUrl: videos[0].url
                    }
                }
            })
                .catch((reason) => M.reply(`ā  An error occurred, Reason: ${reason}`));
        });
    }
}
exports.default = Command;
