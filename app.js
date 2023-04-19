#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'
import * as fs from 'node:fs';
import dotenv from 'dotenv'


dotenv.config()


import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const requestAi = async () => {

    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: "Hello world",
      });
      
      
      console.log(completion.data.choices[0].text);
}

requestAi()


const addConfig = (key, value) => {
    const file = loadFile()
    let obj = {}
    obj[key] = value

    console.log(obj)
    file.push(obj)

    saveFile(file)
    console.log(chalk.green.inverse('new note added'))
}

const displayFile = () => {
    console.log(chalk.bgGreen('Your Config file...'))
    const file = loadFile()
    let fileDisplay = file.map((item) => {
        let parsedItem = {
            title: item.title.argv.title,
            body: item.title.argv.body
        }
        return parsedItem
    })
    console.log(fileDisplay)
}

const saveFile = (file) => {
    const dataJson = JSON.stringify(file);
    fs.writeFileSync('localConfig.json', dataJson)
}

const loadFile = () => {
    try {
        const dataBuffer = fs.readFileSync('localConfig.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson)
    } catch (err){
        return []
    }
}


yargs(hideBin(process.argv))
    .command('test', 'testing yargs', () => {
        console.log('test me daddy')
        console.log(process.argv)
    })
    .command('display-config', 'view display config file', () => {
        displayFile()
    })
    .command('add', 'add to config', (title, body) => {
        addConfig(title, body)
    })
    .command('test-fetch', 'a test of fetching', () => {
        fetch('https://dummyjson.com/cart/1')
            .then(res => res.json())
                .then(json => console.log(json))
    })
    .command('fetch-by-id', 'fetching by Id', () => {}, async (argv) => {
        // fetch(`https://dummyjson.com/cart/${argv.id}`)
        // .then(res => res.json())
        //     .then(json => console.log(json))

        let response = await fetch(`https://dummyjson.com/cart/${argv.id}`)
        let data = await response.json()
        console.log(data)
    })


    // ====-- ai auth --====
    // enter auth deets
    .command('config-keys', 'set configuration keys', () => {}, (argv) => {
        console.log(argv.organization, argv.apiKey)
        addConfig('organization', argv.organization);
        addConfig('apiKey', argv.apiKey)
    })
    .command('request-ai', 'make a request to openAi', () => {}, async (argv) => {
        let response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'GET'
        })
        // https://api.openai.com/v1/chat/completions
    })
.help()
.argv






