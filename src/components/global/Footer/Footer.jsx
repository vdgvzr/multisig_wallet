export default function Footer() {
  return (
    <>
      <footer className="footer text-center p-3 sticky">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a
          className="ms-2"
          href={import.meta.env.VITE_DEVELOPER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {import.meta.env.VITE_DEVELOPER}
        </a>
      </footer>
    </>
  );
}
