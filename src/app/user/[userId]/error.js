"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <h1 className="text-6xl text-red-600">Error</h1>
      <p>
        This page is restricted unless you sign-up or sign in, Please create an
        account or log in to view your profile!
      </p>
      <br></br>
      <p>{error.message}</p>
      <a
        href="/sign-up"
        className="flex bg-white rounded text-black items-center text-center
             w-fit justify-center hover:bg-green-400 hover:text-black m-1"
      >
        Sign-Up
      </a>
      <a
        href="/sign-in"
        className="flex bg-white rounded text-black items-center text-center
             w-14 justify-center hover:bg-green-400 hover:text-black"
        onClick={() => reset()}
      >
        Sign-In
      </a>
      {/* <SignIn /> */}
      <a
        className="flex bg-white rounded text-black items-center text-center
             w-14 justify-center hover:bg-green-400 hover:text-black m-1"
        href="/"
      >
        Home
      </a>
    </main>
  );
}
