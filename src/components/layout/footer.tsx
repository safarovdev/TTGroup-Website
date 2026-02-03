export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TourEast Transport Group. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
