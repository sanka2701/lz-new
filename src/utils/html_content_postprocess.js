import axios from 'axios';
import _ from 'lodash';
import FormData from 'form-data';
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
            if(node.localName === 'img') {
                const srcLink = node.currentSrc;
                srcLink.startsWith('blob:') && outputList.push(srcLink);
            }
            node.childNodes.forEach((child) => {
                recurseDomChildren(child)
            })
        };

        recurseDomChildren(htmlRootNode);

        return outputList;
    };

    //todo: remove
    uploadImg = async (file) => {
        let result;
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${ROOT_URL}/files/upload`, formData)
            .then(request => {
                result = request.data;
            }).catch(error => {
                throw {
                    message: 'error.postingImage',
                    error
                }
            });
        return `${ROOT_URL}/img/${result.replace(/\\/g,'/')}`;
    };

    blobUrlToFile = async (blobUrl) => {
        let file;
        await axios({
            method: 'get',
            url: blobUrl,
            responseType: 'blob'
        }).then(response => {
            file = new File([response.data], 'temporaryImg.jpg', {
                type: "image/jpeg"
            });
        }).catch(error => {
            throw {
                message: 'error.retrievingBlob',
                error
            }
        });

        return file;
    };

    getUrlMap = async (blobUrls) => {
        const urlMap = {};
        for (let blobUrl of blobUrls) {
            urlMap[blobUrl] = await this.blobUrlToFile(blobUrl);
        }
        return urlMap;
    };

    getContentFiles = async(content) => {
        const htmlRootNode = this.contentToHtmlRootNode(content);
        const imgBlobUrls = this.extractImgSources(htmlRootNode);
        return await this.getUrlMap(imgBlobUrls);
    };

    //todo: remove
    postProcess = async (content) => {
        const htmlRootNode = this.contentToHtmlRootNode(content);
        const imgBlobUrls = this.extractImgSources(htmlRootNode);
        const urlMap = await this.getUrlMap(imgBlobUrls);
        return urlMap;
    }
}