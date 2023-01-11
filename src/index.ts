import fetch from "node-fetch"
import { writeFile } from "fs";


async function init() {
    try {
        const bing = await fetch(
            "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN"
        );
        const bingJson = await bing.json();
        const { images = [] } = bingJson;
        let { url } = images[0] || {};

        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const date = `${year}-${month}-${day}`;

        console.log(time.getHours());
        console.log("date", date);


        url = url.split("1920x1080").join("UHD");

        const bing4kUrl = `https://cn.bing.com/${url}`;
        const bingPreviewUrl = `https://cn.bing.com/${url}&w=480&h=270`;
        const file4kUrl = `./static/${date}-4k.jpg`;
        const filePreviewUrl = `./static/${date}-preview.jpg`;

        //异步
        const download = async function (url: any, file: any, name: any) {
            const response = await fetch(url);
            const buffer = await response.buffer();
            writeFile(file, buffer, () =>
                console.log(`finished downloading! ${name}`)
            );
        }

        await download(bing4kUrl, file4kUrl, `${date}-4k`);
        await download(bingPreviewUrl, filePreviewUrl, `${date}-preview`);



    } catch (e) {
        console.log("err", e);
    }
}


init();
