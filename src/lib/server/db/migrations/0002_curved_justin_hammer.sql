PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product_categories` (
	`product_id` text NOT NULL,
	`category_id` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_product_categories`("product_id", "category_id") SELECT "product_id", "category_id" FROM `product_categories`;--> statement-breakpoint
DROP TABLE `product_categories`;--> statement-breakpoint
ALTER TABLE `__new_product_categories` RENAME TO `product_categories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;