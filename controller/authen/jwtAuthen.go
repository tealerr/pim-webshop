package authen

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func authenUser() {
	// Replace these with your own values
	userID := "12345"
	username := "example_user"
	secretKey := []byte("your_secret_key")

	// Create a new token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  userID,
		"username": username,
		"exp":      time.Now().Add(time.Minute * 30).Unix(), // Token expiration time
	})

	// Sign and get the complete encoded token as a string
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		fmt.Println("Error creating token:", err)
		return
	}

	// Print the token (you would send this token to the client)
	fmt.Printf("JWT Token: %v\n", tokenString)
}
