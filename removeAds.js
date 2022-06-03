


function removeAds() {
    
    chrome.storage.sync.get("current_url", ({ current_url }) => {
        let current_url_temp = "";
        
        current_url_temp = current_url;
        chrome.storage.sync.get("allowed_url", ({ allowed_url }) => {
            let temp_dict = {};
            temp_dict = allowed_url;
            if (temp_dict[current_url_temp] != null && temp_dict[current_url_temp] == 1) {
                let spans = document.getElementsByTagName("iframe");
                let link = document.getElementsByTagName("a");
                
                for (let i = 0; i < spans.length; ++i) {
                    if (spans[i].src.includes("video-js") || spans[i].allowFullscreen) {
                        //console.log(spans[i]);
                        // Get the div that wraps around the entire ad
                        //let card = spans[i].closest(".fourteen.columns");
                        //console.log(card);
        
                        // If the class changed and we can't find it with closest(), get the 6th parent
                        /*
                        if (card === null) {
                            // Could also be card.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode :D
                            let j = 0;
                            card = spans[i];
                            while (j < 6) {
                                card = card.parentNode;
                                ++j;
                            }
                        }*/
        
                        // Make the ad disappear!
                        //card.setAttribute("style", "display: none !important;");
                    }
                    else {
                        spans[i].setAttribute("style", "display: none !important;");
                    }
                }
        
                for (let i = 0; i < link.length; ++i) {
                    if (link[i].href.includes("click.aspx") || link[i].allowFullscreen) {
                        link[i].setAttribute("style", "display: none !important;");
                    }
                }
            }
        });
    });
    
    
    
}


removeAds();

setInterval(function () {
    removeAds();
}, 5000)