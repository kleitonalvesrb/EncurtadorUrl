
CREATE SEQUENCE encurtador.url_urlid_seq;

CREATE TABLE encurtador.url (
                urlid INTEGER NOT NULL DEFAULT nextval('encurtador.url_urlid_seq'),
                urlencurtada VARCHAR NOT NULL,
                urloriginal VARCHAR NOT NULL,
                urldescricao VARCHAR NOT NULL,
                urldatainc TIMESTAMP DEFAULT now() NOT NULL,
                urlstatus BOOLEAN DEFAULT true NOT NULL,
                CONSTRAINT urlid PRIMARY KEY (urlid)
);
COMMENT ON TABLE encurtador.url IS 'Tabela que ir� armazenar os dados de url que ser�o encurtadas';
COMMENT ON COLUMN encurtador.url.urlid IS 'Chave prim�ria';
COMMENT ON COLUMN encurtador.url.urlencurtada IS 'url ja encurtada';
COMMENT ON COLUMN encurtador.url.urloriginal IS 'url original';
COMMENT ON COLUMN encurtador.url.urldescricao IS 'descri��o da url';
COMMENT ON COLUMN encurtador.url.urldatainc IS 'data e hora da inclus�o da url';
COMMENT ON COLUMN encurtador.url.urlstatus IS 'campo para controle de exclus�o logica';


ALTER SEQUENCE encurtador.url_urlid_seq OWNED BY encurtador.url.urlid;
