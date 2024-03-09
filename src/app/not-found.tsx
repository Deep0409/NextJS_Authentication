import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found Page h bhai</h2>
      <p>Could not find requested resource isliye kuch aur try kr bhai</p>
      <Link href="/">Return Home ja bhai</Link>
    </div>
  )
}