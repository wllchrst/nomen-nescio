import { useState, useEffect } from "react";

const useWords = () => {
    const[words, setWords] = useState<string[]>([
        "File.",
        "Signature.",
        "Security.",
        ""
    ]);

    useEffect(() => {

    }, []);

    return words;
}

export default useWords;