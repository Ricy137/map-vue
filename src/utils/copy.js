//复制string到剪切板
async function copyPageUrl(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy: ', err);
        return false
    }
}

export default copyPageUrl