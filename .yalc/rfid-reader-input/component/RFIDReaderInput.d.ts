import React from "react";
type CardReaderProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    handleCodeCardRFID: (code: string) => void;
    textTitle?: string;
    textBody?: string;
};
export declare function RFIDReaderInput({ isOpen, onRequestClose, handleCodeCardRFID, textTitle, textBody }: CardReaderProps): React.JSX.Element;
export {};
