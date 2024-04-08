import { useEffect, useRef } from "react";
import React from "react";
import { RiRfidLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { css } from './styles';
export function RFIDReaderInput({ isOpen, onRequestClose, handleCodeCardRFID, textTitle = 'Identificação RFID', textBody = 'Aproxime o cartão' }) {
    const inputRef = useRef(null);
    useEffect(() => {
        const teste = () => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select();
        };
        teste();
    }, [isOpen]);
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, css),
        React.createElement("div", { className: `${isOpen ? '' : 'invisible'}` },
            React.createElement("div", { className: 'opacityBg' }),
            React.createElement("div", { className: 'card' },
                React.createElement("div", { className: "titleCard" },
                    textTitle,
                    " ",
                    React.createElement("button", { onClick: () => { onRequestClose(); }, className: "z-50" },
                        React.createElement(IoCloseOutline, { size: 25 }))),
                React.createElement("div", { className: "bodyCard" },
                    " ",
                    textBody,
                    " ",
                    React.createElement(RiRfidLine, { size: 50 })),
                React.createElement("div", null,
                    React.createElement("input", { onChange: (event) => {
                            setTimeout(() => {
                                handleCodeCardRFID(event.target.value);
                                onRequestClose();
                            }, 180);
                        }, type: "number", ref: inputRef, className: 'inputCard' }))))));
}
