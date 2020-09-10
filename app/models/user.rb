# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  company_id      :integer          not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  role            :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#  leader_id       :integer
#
class User < ApplicationRecord
    attr_reader :password
    after_initialize :ensure_session_token

    validates :email, :first_name, :last_name, :session_token, presence:true, uniqueness:true
    validates :password_digest, presence: { message: 'password must not be blank'}
    validates :password, length: {minimum:8, allow_nil:true}

    belongs_to :company,
    class_name: "Company",
    foreign_key: :company_id,
    primary_key: :id

    belongs_to :leader,
    class_name: "User",
    foreign_key: :leader_id,
    primary_key: :id

    has_many :active_cleanings
    has_many :accounts, through: :active_cleanings, source: :accounts

    def self.find_by_credentials(email,password)
        user = User.find_by(email: email)

        return nil if user.nil?

        user && user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password

        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def generate_session_token
        token = SecureRandom.urlsafe_base64(16)

        while self.class.exists?(session_token: token)
            token = SecureRandom.urlsafe_base64(16)
        end

        token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!

        self.session_token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end


end
