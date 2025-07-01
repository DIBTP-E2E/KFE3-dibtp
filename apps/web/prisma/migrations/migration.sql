-- CreateTable
CREATE TABLE "bids" (
    "product_id" BIGINT NOT NULL,
    "bid_price" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bid_id" BIGSERIAL NOT NULL,
    "bidder_user_id" UUID NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("bid_id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "chat_message_id" BIGSERIAL NOT NULL,
    "chat_room_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender_user_id" UUID NOT NULL,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("chat_message_id")
);

-- CreateTable
CREATE TABLE "chat_rooms" (
    "chat_room_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" BIGINT NOT NULL,
    "seller_user_id" UUID NOT NULL,
    "buyer_user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_rooms_pkey" PRIMARY KEY ("chat_room_id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "image_id" BIGSERIAL NOT NULL,
    "product_id" BIGINT NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" BIGSERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "start_price" DECIMAL NOT NULL,
    "current_price" DECIMAL NOT NULL,
    "min_price" DECIMAL NOT NULL,
    "decrease_unit" DECIMAL NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'ACTIVE',
    "auction_start_time" TIMESTAMPTZ(6) NOT NULL,
    "auction_end_time" TIMESTAMPTZ(6) NOT NULL,
    "region" VARCHAR NOT NULL,
    "detail_address" VARCHAR NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "seller_user_id" UUID NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nickname" VARCHAR NOT NULL,
    "profile_image" VARCHAR,
    "region" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "detail_address" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bids_product_id_key" ON "bids"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "bids_bid_id_key" ON "bids"("bid_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_product_users" ON "chat_rooms"("product_id", "seller_user_id", "buyer_user_id");

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_bidder_user_id_fkey" FOREIGN KEY ("bidder_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("chat_room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_buyer_user_id_fkey" FOREIGN KEY ("buyer_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_seller_user_id_fkey" FOREIGN KEY ("seller_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_seller_user_id_fkey" FOREIGN KEY ("seller_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

