// Replace "YOUR_ACTUAL_API_KEY" with your Giphy API key
let apikey = "lwiQL2smYCMJ5S4CqmZQM52o1wOJ5oWO";

let submitBtn = document.getElementById("search-btn");

let generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    let q = document.getElementById("search-box").value;
    let gifCount = 10;

    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    fetch(finalURL)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            return resp.json();
        })
        .then((info) => {
            console.log(info.data);

            let gifsData = info.data;
            gifsData.forEach((gif) => {
                let container = document.createElement("div");
                container.classList.add("container");

                let iframe = document.createElement("img");
                iframe.src = gif.images.fixed_height.url;

                iframe.onload = () => {
                    gifCount--;
                    if (gifCount === 0) {
                        loader.style.display = "none";
                        document.querySelector(".wrapper").style.display = "grid";
                    }
                };
                container.append(iframe);

                let copyBtn = document.createElement("button");
                copyBtn.innerHTML = "Copy Link";
                copyBtn.onclick = () => {
                    let copyLink = `http://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    navigator.clipboard.writeText(copyLink)
                        .then(() => {
                            alert("Gif copied to clipboard");
                        })
                        .catch(() => {
                            alert("Failed to copy gif to clipboard");
                            let hiddenInput = document.createElement("input");
                            hiddenInput.setAttribute("type", "text");
                            document.body.appendChild(hiddenInput);
                            hiddenInput.value = copyLink;
                            hiddenInput.select();
                            document.execCommand("copy");
                            document.body.removeChild(hiddenInput);
                        });
                };

                container.append(copyBtn);
                document.querySelector(".wrapper").append(container);
            });
        })
        .catch((error) => {
            console.error("Error fetching GIFs:", error);
        });
};

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
