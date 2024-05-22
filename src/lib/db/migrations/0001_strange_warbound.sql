CREATE UNIQUE INDEX `characteristics_unique_phone_id` ON `characteristics` (`phoneId`);--> statement-breakpoint
CREATE UNIQUE INDEX `offer_unique_vendor` ON `offer` (`vendor`,`phoneId`);--> statement-breakpoint
CREATE UNIQUE INDEX `photo_unique_url` ON `photo` (`url`,`phoneId`);