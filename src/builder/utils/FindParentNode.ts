interface FindParentNode {
    targetNode: HTMLElement;
    parentClassName: string;
}

export const findParentNode = ({ targetNode, parentClassName }: FindParentNode): any => {
    // Check element has parentClassName class
    let isParentNode: boolean | undefined = undefined
    targetNode.classList.forEach(className => { if (className == parentClassName) isParentNode = true })
    if (isParentNode) return targetNode
    // Check parent node
    let itemNode: HTMLElement | undefined = undefined
    const parentNode = targetNode.parentElement
    if (parentNode) parentNode.classList.forEach(className => { if (className == parentClassName) itemNode = parentNode })
    if (itemNode) return itemNode
    // Check element is HTML
    if (parentNode?.tagName == 'HTML') return false
    // Recall function
    if (!itemNode && parentNode) return findParentNode({ targetNode: parentNode, parentClassName })
}