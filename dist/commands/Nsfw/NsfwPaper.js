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
const request_1 = __importDefault(require("../../lib/request"));
const baileys_1 = require("@adiwajshing/baileys");
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
class Command extends BaseCommand_1.default {
    constructor(client, handler) {
        super(client, handler, {
            command: "nsfwpaper",
            description: `NSFW Paper ;)\nType ${client.config.prefix}npaper to check all available options`,
            aliases: ["npaper", "np"],
            category: "nsfw",
            usage: `${client.config.prefix}nsfwpaper [option]`,
            baseXp: 20,
        });
        this.run = (M, { joined }) => __awaiter(this, void 0, void 0, function* () {
            // consider neko and kitsune in furry
            const char = ["yuri", "lewdkemo", "hentai", "erofeet", "tits", "trap"];
            const chitoge = joined.trim().split(" ")[0].toLowerCase();
            let text = "";
            char.map((c) => {
                text += `📍${c.charAt(0).toUpperCase() + c.slice(1)}\n`;
                // index % 4 === 3 ? (text += '\n') : (text += ' '.repeat(10 - c.length))
            });
            if (!chitoge)
                return void M.reply(`🪧 *OPTIONS:*\n${text}Use ${this.client.config.prefix}ac (option) to get Characters\nExample: ${this.client.config.prefix}nsfwpaper hentai`);
            if (!char.includes(chitoge))
                return void M.reply(`✖️ Invalid option! 🧧\nUse ${this.client.config.prefix}animepaper to see all available options`);
            // fetch result of https://nekos.life/api/v2/img/ from the API using axios
            const { data } = yield axios_1.default.get(`https://nekos.life/api/v2/img/${chitoge}`);
            if (!(yield this.client.getGroupData(M.from)).nsfw)
                return void M.reply(`Don't be a pervert, Baka! This is not an NSFW group.`);
            const buffer = yield request_1.default.buffer(data.url).catch((e) => {
                return void M.reply(e.message);
            });
            while (true) {
                try {
                    M.reply(buffer || "Could not fetch image. Please try again later", baileys_1.MessageType.image, undefined, undefined, `🌟 Here you go.\n`, undefined).catch((e) => {
                        console.log(`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`);
                        // console.log('Failed')
                        M.reply(`Could not fetch image. Here's the URL: ${data.url}`);
                    });
                    break;
                }
                catch (e) {
                    // console.log('Failed2')
                    M.reply(`Could not fetch image. Here's the URL : ${data.url}`);
                    console.log(`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`);
                }
            }
            return void null;
        });
    }
}
exports.default = Command;
