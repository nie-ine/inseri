export default () => {
    let text = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return text;
};
