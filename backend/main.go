package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "modernc.org/sqlite"
)

type Message struct {
	Name        string `json:"name"`
	Message     string `json:"message"`
	DateCreated string `json:"date_created"`
}

type MessageResponse struct {
	Messages []Message `json:"messages"`
}

func main() {
	db, err := sql.Open("sqlite", "db.sqlite")
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/message", func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			fmt.Println(err)
			return
		}

		name := r.FormValue("name")
		message := r.FormValue("message")

		dbInsertErr := db.QueryRow(`INSERT INTO messages(name, message) VALUES (?, ?)`, name, message)
		if dbInsertErr != nil {
			fmt.Println(dbInsertErr)
		}
	})

	http.HandleFunc("/messages", func(w http.ResponseWriter, r *http.Request) {
		rows, rowsErr := db.Query("select name as Name, message as Message, datetime_created as DateCreated from messages order by datetime_created desc")
		if rowsErr != nil {
			fmt.Println(rowsErr)
		}

		var messages []Message

		for rows.Next() {
			var message Message
			if err := rows.Scan(&message.Name, &message.Message, &message.DateCreated); err != nil {
				return
			}
			messages = append(messages, message)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		var response = MessageResponse{messages}
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	err = http.ListenAndServe(":8080", nil)

	if err != nil {
		fmt.Println(err)
	}

	err = db.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
}
