function urlChecker(userInput) {
    var regexQuery = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\/?%&=]*)$/;
    var url = new RegExp(regexQuery);
    if (url.test(userInput)) {
        alert('Great, you entered a valid URL');
        return true;
    }
    alert('Invalid URL. Please enter a valid URL.');
    return false;
}

export { urlChecker };
