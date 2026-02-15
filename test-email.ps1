$url = "https://tuadgtdrhoaaxvyehlxc.supabase.co/functions/v1/send-contact-email"
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer sb_publishable_xo8bKSRhQn7ED7Ua1lQvsw_fdDCNgGB"
}
$body = @{
    name = "Test User"
    contact = "1234567890"
    email = "ahmed.aashiq23@gmail.com"
    message = "This is a test email sent from the Supabase Edge Function."
} | ConvertTo-Json

Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
