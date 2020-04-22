# README

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar(255)|null: false|
|email|varchar(255)|null: false|
|password|integer|null: false|

### Association
- has_many :posts
- has_many :group, through: :groups_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group-name|varchar(255)|null: false|

### Association
- has_many :user, through: :groups_users


## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|varchar(255)|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user




This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
