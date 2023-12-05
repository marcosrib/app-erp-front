'use client'

import Link from "next/link";


interface Props {
    id: number;
  }
export default function ButtonEdit({id}: Props) {

    
    return (
      <Link href={`/register/user?id=${id}`}>dddd</Link>
    )

}