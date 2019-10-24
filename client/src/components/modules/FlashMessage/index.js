import React from "react";

import { FlashMessageContext } from "../../context/FlashMessage";

import "./style.scss";

function FlashMessage() {
    const flashMessageContext = React.useContext(FlashMessageContext);
    const TYPE_COLORS = [
        "#e8cb56", // WARNING
        "#a32e0a", // ERROR
        "#209403", // SUCCESS
    ];

    return flashMessageContext.show ?
        (
            <div
                className="flash-message"
                style={{
                    backgroundColor: (
                        flashMessageContext.type >= 0 && flashMessageContext.type <= TYPE_COLORS.length
                    ) ?
                        TYPE_COLORS[flashMessageContext.type] :
                        TYPE_COLORS[0] // defaults to warning if improper value given
                }}
            >
                {flashMessageContext.message}
            </div>
        ) :
        null;
}

export default FlashMessage;
