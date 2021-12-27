using System;

namespace serverDH.Dtos
{
    public class NewMessageDto
    {
        public string message { get; set; }
        public string UserID { get; set; }
        public DateTime date { get; set; } = DateTime.Now;
    }
}
