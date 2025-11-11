CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'Nom du produit',
	`description` text DEFAULT 'Description du produit',
	`price` integer DEFAULT 1000,
	`stock` integer DEFAULT 0,
	`published` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`age` integer
);
