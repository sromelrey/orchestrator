import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params);
  return <div>Test Page</div>;
}
