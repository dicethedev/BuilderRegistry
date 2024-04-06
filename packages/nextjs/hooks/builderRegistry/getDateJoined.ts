import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const useRelativeTime = (initialDate: string | number | Date): string => {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    let timestamp: number;

    if (typeof initialDate === "string") {
      timestamp = parseInt(initialDate);
    } else if (typeof initialDate === "number") {
      timestamp = initialDate;
    } else {
      timestamp = initialDate.getTime();
    }

    if (timestamp > 1e12) {
      timestamp = Math.floor(timestamp / 1000);
    }

    const relativeTimeString = formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
    setRelativeTime(relativeTimeString);
  }, [initialDate]);

  return relativeTime;
};

export default useRelativeTime;
