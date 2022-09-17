import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, {Component} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Icon, IconButton, Avatar } from "@mui/material";
import { firestore } from "../firebase/firebase";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import FileItem from "../components/FileItem";

export default function Home() {
  const { data: session } = useSession();

  const sampleDB = {
    user: "mithun@mithunb.com",
    files: [
      {
        type: "folder",
        name: "Mithun",
        contents: [],
      },
      {
        type: "notebook",
        name: "Bruh",
        pages: [
          {
            title: "bruh",
            content: [
              { type: "heading", content: "Sample Heading" },
              { type: "heading", content: "Sample Heading" },
            ],
          },
        ],
      },
    ],
  };

  if (session) {
    return (
      <>
        <div className={styles.profile}>
          <Avatar alt={session.user.name} src={session.user.image} />
          <Button variant="contained" onClick={() => signOut()}>
            Sign out
          </Button>
          Welcome! {session.user.name} <br />
          Signed in as {session.user.email} <br />         
        </div>
        
        
        <div className={styles.container}>
          <Head>
            <title>Cotes</title>
            <meta
              name="description"
              content="Note Taking App for Programmers"
            />
          </Head>

          <main className={styles.main}>
            <div>
              <h1>{session.user.name}'s Files</h1>
              <div>
                {sampleDB.files.map((file) => (
                  <div key={sampleDB.index}>
                    <FileItem type={file.type} name={file.name} />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.homeTitle}>
        CotesApp <br />
        <Button variant="contained" onClick={() => signIn()}>
            Sign in
        </Button>
      </div>
      
    </>
  );
}
