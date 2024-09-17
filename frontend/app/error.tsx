'use client'

import Button from "@/components/common/button"

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return <div>
        <p>{error.message || "Something went wrong ..."}</p>
        <Button onClick={reset}>Reset</Button>
    </div>
}