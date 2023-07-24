  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE  TABLE  IF  NOT  EXISTS  public.users
  (
    id uuid NOT NULL  DEFAULT uuid_generate_v4(),
    name character varying(100) COLLATE pg_catalog."default"  NOT NULL,
    email character varying(70) COLLATE pg_catalog."default"  NOT NULL,
    password character varying(255) COLLATE pg_catalog."default"  NOT NULL,
    created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
    updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
    deleted_at timestamp without time zone,
    CONSTRAINT  "PK_d7281c63c176e152e4c531594a8"  PRIMARY KEY (id)
  );
  
  ALTER  TABLE  IF  EXISTS  public.users  OWNER  to  root;