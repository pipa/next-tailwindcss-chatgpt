import { ReactElement } from "react";

export default function Head({ params }: { params?: { slug: string } }): ReactElement {
  return (
    <>
      <title>My Page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/favicon.ico" rel="shortcut icon" />
    </>
  )
}