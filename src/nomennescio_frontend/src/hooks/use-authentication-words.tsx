import { useState, useEffect } from "react";

const useWords = () => {
    const[words, setWords] = useState<string[]>([
        "File.",
        "Way.",
        "Safety.",
        ""
    ]);

    useEffect(() => {

    }, []);

    return words;
}

export default useWords;