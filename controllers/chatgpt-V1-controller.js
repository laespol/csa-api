const { PrismaClient } = require('@prisma/client')
const OpenAI = require('openai-api');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

const prisma = new PrismaClient()

exports.postChatgpt = async (req, res, next) => {
    const prompt = 'Q: Olá, qual é o seu nome?\nA: Meu nome é ChatGPT. Como posso ajudá-lo?';

    try {
        console.log(OPENAI_API_KEY);

        const gptResponse = await openai.Completion.create({
            engine: 'davinci',
            prompt,
            maxTokens: 1024,
            n: 1,
            stop: null,
            temperature: 0.7,
          }, { apiKey: OPENAI_API_KEY });

        console.log(gptResponse);

        const response = {
            ok: true,
            message: 'Resposta',
            gptResponse: gptResponse
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

