export default (parent) => {
    const outputList = [];
    const recurseDomChildren = (node) => {
        (node.localName === 'img') && outputList.push(node.currentSrc);
        node.childNodes.forEach((child) => {
            recurseDomChildren(child)
        })
    };

    recurseDomChildren(parent);

    return outputList;
}
