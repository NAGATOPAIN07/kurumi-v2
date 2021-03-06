import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'aku',
            description: 'Displays info about aku.',
            category: 'general',
            usage: `${client.config.prefix}aku`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://i.pinimg.com/564x/37/f1/42/37f142bfbfc1bcc7be1b104e4dbf6af4.jpg','https://i.pinimg.com/564x/0f/c3/7c/0fc37c10eee0e70e918202e1fa084fa9.jpg'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.image, {quoted:M.WAMessage,
            mimetype: Mimetype.jpeg,
            caption: `đ­đ”đČđčđčđŒ!đI'm AKU, just a regular ugly guy.
            
đđđđđ©đšđŒđ„đ„;
Wa.me/+923087880256
đźđđŁđšđ©đđđ§đđą;
ïœđąđđđđđ đČđđđïœ 
đđżđđšđđ€đ§đ;
discordapp.com/users/Sempai#5552
âȘŒđČđŸđŸ đđșđ đ` }
        )
    }
}