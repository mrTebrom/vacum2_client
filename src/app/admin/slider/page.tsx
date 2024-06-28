"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SliderPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/slider")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={600}
              height={400}
            />
          </div>
        ))}
    </div>
  );
}
