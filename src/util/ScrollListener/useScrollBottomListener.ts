/**
 * Calls listener when scroll reaches the page bottom.
 * */
import { useLayoutEffect, useState } from "react";

export const useScrollBottomListener = (offset: number, listener: () => void): void => {
    const [didCalledListener, setDidCalledListener] = useState(false)

    useLayoutEffect(() => {
        let watching = true;
        const doc = document.querySelector("html");

        const watcher = () => {
            if (watching && doc) {
                if (doc.scrollTop >= doc.scrollHeight - doc.clientHeight - offset) {
                    if (!didCalledListener) {
                        setDidCalledListener(true);
                        listener();
                    }
                } else {
                    setDidCalledListener(false);
                }

                requestAnimationFrame(watcher);
            }
        }

        requestAnimationFrame(watcher);

        return () => {
            watching = false;
        }
    }, [offset, listener, didCalledListener]);
}
