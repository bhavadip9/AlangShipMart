import React, { useEffect } from 'react';

const WatsonAssistant = () => {
    useEffect(() => {
        window.watsonAssistantChatOptions = {
            integrationID: "f8389866-8e10-448d-a755-b25b955c5657", // The ID of this integration.
            region: "au-syd", // The region your integration is hosted in.
            serviceInstanceID: "87d125a5-01d1-48db-b1de-e8699e9096d0", // The ID of your service instance.
            onLoad: async (instance) => { await instance.render(); }
        };
        setTimeout(function () {
            const t = document.createElement('script');
            t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
            document.head.appendChild(t);
        }, 0);
    }, []);



    return (
        <div>

        </div>
    );
};

export default WatsonAssistant;