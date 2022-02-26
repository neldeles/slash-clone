export function MobileWarning() {
  return (
    <div className="flex flex-col justify-center items-center py-8 h-screen">
      <header>
        <h1 className="text-2xl font-bold text-black">
          Sorry! Minimum screen width must be 992px.
        </h1>
      </header>
      <main className="px-4 mx-auto mt-4 text-center">
        <p className="text-2xl font-light text-gray-350">
          The web app isn't optimized for smaller devices. 😅 <br />
          <br />
          The TLDR: I plan to learn React Native in the future by implementing a
          mobile-friendly version. You can read more about it in the{" "}
          <a
            href="https://github.com/neldeles/slash-clone"
            className="text-indigo-100 hover:text-indigo-200 hover:underline"
          >
            readme
          </a>
          .
          <br />
          <br />
          The readme has screenshots and gifs if you want an idea of how the app
          works.
        </p>
      </main>
    </div>
  );
}
