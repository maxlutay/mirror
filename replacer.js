fetch("./.netlify/functions/proxy")
.then(res => res.text())
.then(text => {
    const urlAttributesRegex = /(href|link|src|background)="(?!https?:\/\/)|(\.?\.?\/?)([^"]+?)"/g;
    const urlCssRegex = /url\((?!https?:\/\/)|(\.?\.?\/?)([^)"]+?)|(\"[^)"]+\")\)/g;

    return text.replace(urlAttributesRegex, "$1=\"./.netlify/functions/proxy?to=$3$4\"")
        .replace(urlCssRegex, "url(./netlify/functions/proxy?to=$1)")
        ;
})
.then(text => (console.log(text), document.documentElement.innerHTML = text))
.catch(_ => document.body.innerText = `Sorry, some error: ${_}`)
.then(() => {
    document.querySelectorAll('a:not([href^="http"])').forEach(a => a.addEventListener("click", (ev) => {
        ev.preventDefault();
        let sth = a.getAttribute("href")//.replace(/^\.\/+/,"");
        fetch(sth)
            .then(res => res.text())
            .then(text => document.documentElement.innerHTML = text)
            .catch(_ => document.body.innerText = `Sorry, some error: ${_}`)
    }));
});
