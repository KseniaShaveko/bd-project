CREATE TABLE `characteristics` (
	`id` integer PRIMARY KEY NOT NULL,
	`color` text,
	`simCards` text,
	`diagonal` text,
	`resolution` text,
	`material` text,
	`operationSystem` text,
	`cpu` text,
	`gpu` text,
	`ram` text,
	`storage` text,
	`backCameraQuality` text,
	`frontCameraQuality` text,
	`chargingPort` text,
	`audioPort` text,
	`batteryCapacity` text,
	`phoneId` integer,
	FOREIGN KEY (`phoneId`) REFERENCES `phone`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `offer` (
	`id` integer PRIMARY KEY NOT NULL,
	`vendor` text NOT NULL,
	`url` text NOT NULL,
	`description` text NOT NULL,
	`phoneId` integer,
	FOREIGN KEY (`phoneId`) REFERENCES `phone`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `phone` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`manufacturer` text NOT NULL,
	`year` integer NOT NULL,
	`price` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `photo` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`phoneId` integer,
	FOREIGN KEY (`phoneId`) REFERENCES `phone`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `phone_unique_name` ON `phone` (`name`);