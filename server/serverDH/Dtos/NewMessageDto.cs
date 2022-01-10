using System;

namespace serverDH.Dtos
{
    public class NewMessageDto
    {
        public string UserID { get; set; }
        public string message { get; set; }
        public string username { get; set; }
        public DateTime date { get; set; } = DateTime.Now;
    }
}
