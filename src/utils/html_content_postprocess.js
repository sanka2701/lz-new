import axios from 'axios';
import _ from 'lodash';
import FormData from 'form-data'
import { ROOT_URL } from './constant';

export default class HtmlContentPostprocess {
    contentToHtmlRootNode = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString ? htmlString.trim() : '';
        return div;
    };

    extractImgSources = (htmlRootNode) => {
        const outputList = [];
        const recurseDomChildren = (node) => {
            (node.localName === 'img') && outputList.push(node.currentSrc);
            node.childNodes.forEach((child) => {
                recurseDomChildren(child)
            })
        };

        recurseDomChildren(htmlRootNode);

        return outputList;
    };

    uploadImg = async (file) => {
        let result;
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${ROOT_URL}/files/upload`, formData)
            .then(request => {
                result = request.data;
            }).catch(err => {
                debugger;
            });
        return result;
    };

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    blobUrlToFile = async (blobUrl) => {
        let file;
        await axios({
            method: 'get',
            url: blobUrl,
            responseType: 'blob'
        }).then(response => {
            // todo: remove random number assignement - just dev purpose
            file = new File([response.data], 'sovycka' + this.getRandomInt(0,9999) + '.jpg', {
                type: "image/jpeg"
            });
        }).catch(err => {
            debugger
        });

        return file;
    };

    substituteUrls = (map, content) => {
        let replaced = content;
        _.forOwn(map, (value, key) => {
            replaced = replaced.replace(key, value)
        });

        // console.log('map', map);
        // console.log(replaced);

        return replaced;
    };

    getUrlMap = async (blobUrls) => {
        const urlMap = {};
        for (let blobUrl of blobUrls) {
            const file = await this.blobUrlToFile(blobUrl);
            const serverSideLocation = await this.uploadImg(file);
            urlMap[blobUrl] = `${ROOT_URL}/img/${serverSideLocation.replace(/\\/g,'/')}`
        }
        return urlMap;
    };

    postProcess = async (content) => {
        const htmlRootNode = this.contentToHtmlRootNode(content);
        const imgBlobUrls = this.extractImgSources(htmlRootNode);
        const urlMap = await this.getUrlMap(imgBlobUrls);
        return this.substituteUrls(urlMap, content);
    }
}